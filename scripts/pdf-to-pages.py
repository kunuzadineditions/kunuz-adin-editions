#!/usr/bin/env python3
"""
Convert PDF pages to high-quality JPGs using macOS CoreGraphics (zero dependencies).

Strategy: render each page at 4× the target size (3360×4760) then downsample
to 840×1190 with kCGInterpolationHigh — equivalent to ~288 DPI for A5 pages.

Usage:
  python3 scripts/pdf-to-pages.py           # first 20 pages
  python3 scripts/pdf-to-pages.py 10        # first N pages
  python3 scripts/pdf-to-pages.py --force   # overwrite existing files
"""

import ctypes, ctypes.util, os, sys

# ── Framework handles ─────────────────────────────────────────────────────────
CG = ctypes.CDLL(ctypes.util.find_library("CoreGraphics"))
II = ctypes.CDLL(ctypes.util.find_library("ImageIO"))
CF = ctypes.CDLL(ctypes.util.find_library("CoreFoundation"))

c_void_p = ctypes.c_void_p
c_size_t = ctypes.c_size_t
c_bool   = ctypes.c_bool

# ── CoreFoundation helpers ────────────────────────────────────────────────────
CF.CFRelease.restype = None
CF.CFRelease.argtypes = [c_void_p]

CF.CFStringCreateWithCString.restype = c_void_p
CF.CFStringCreateWithCString.argtypes = [c_void_p, ctypes.c_char_p, ctypes.c_uint32]
kCFStringEncodingUTF8 = 0x08000100

def cfstr(s):
    return CF.CFStringCreateWithCString(None, s.encode(), kCFStringEncodingUTF8)

CF.CFURLCreateFromFileSystemRepresentation.restype = c_void_p
CF.CFURLCreateFromFileSystemRepresentation.argtypes = [
    c_void_p, ctypes.c_char_p, c_size_t, c_bool
]

def cfurl(path):
    b = os.path.abspath(path).encode()
    return CF.CFURLCreateFromFileSystemRepresentation(None, b, len(b), False)

# JPEG quality dictionary via CFNumberRef + CFDictionaryRef
CF.CFNumberCreate.restype = c_void_p
CF.CFNumberCreate.argtypes = [c_void_p, ctypes.c_int, c_void_p]
kCFNumberFloat64Type = 13

CF.CFDictionaryCreate.restype = c_void_p
CF.CFDictionaryCreate.argtypes = [
    c_void_p,
    ctypes.POINTER(c_void_p), ctypes.POINTER(c_void_p),
    c_size_t,
    c_void_p, c_void_p,
]

# Load callback structs (needed by CFDictionaryCreate)
class _CBStruct(ctypes.Structure):
    _fields_ = [(f, c_void_p) for f in ("version","retain","release","copyDesc","equal","hash")]

try:
    _key_cb = _CBStruct.in_dll(CF, "kCFTypeDictionaryKeyCallBacks")
    _val_cb = _CBStruct.in_dll(CF, "kCFTypeDictionaryValueCallBacks")

    _quality_cfstr = c_void_p.in_dll(II, "kCGImageDestinationLossyCompressionQuality")
    _quality_f64   = ctypes.c_double(0.92)
    _quality_cfnum = CF.CFNumberCreate(None, kCFNumberFloat64Type, ctypes.byref(_quality_f64))

    _keys = (c_void_p * 1)(_quality_cfstr)
    _vals = (c_void_p * 1)(_quality_cfnum)
    JPEG_PROPS = CF.CFDictionaryCreate(
        None, _keys, _vals, 1,
        ctypes.addressof(_key_cb), ctypes.addressof(_val_cb),
    )
except Exception as _e:
    print(f"  (JPEG quality props unavailable: {_e} — using ImageIO default ~85%)")
    JPEG_PROPS = None

# ── CoreGraphics types & functions ────────────────────────────────────────────
class CGRect(ctypes.Structure):
    _fields_ = [("x", ctypes.c_double), ("y", ctypes.c_double),
                ("width", ctypes.c_double), ("height", ctypes.c_double)]

CG.CGPDFDocumentCreateWithURL.restype = c_void_p
CG.CGPDFDocumentCreateWithURL.argtypes = [c_void_p]
CG.CGPDFDocumentGetNumberOfPages.restype = c_size_t
CG.CGPDFDocumentGetNumberOfPages.argtypes = [c_void_p]
CG.CGPDFDocumentGetPage.restype = c_void_p
CG.CGPDFDocumentGetPage.argtypes = [c_void_p, c_size_t]
CG.CGPDFPageGetBoxRect.restype = CGRect
CG.CGPDFPageGetBoxRect.argtypes = [c_void_p, ctypes.c_int]
kCGPDFMediaBox = 1

CG.CGColorSpaceCreateDeviceRGB.restype = c_void_p
CG.CGColorSpaceRelease.restype = None
CG.CGColorSpaceRelease.argtypes = [c_void_p]

kCGBitmapByteOrder32Host   = 0x2000
kCGImageAlphaNoneSkipFirst = 6
BITMAP_INFO = kCGBitmapByteOrder32Host | kCGImageAlphaNoneSkipFirst

CG.CGBitmapContextCreate.restype = c_void_p
CG.CGBitmapContextCreate.argtypes = [
    c_void_p, c_size_t, c_size_t, c_size_t, c_size_t, c_void_p, ctypes.c_uint32
]
CG.CGContextRelease.restype = None
CG.CGContextRelease.argtypes = [c_void_p]

CG.CGContextSetRGBFillColor.restype = None
CG.CGContextSetRGBFillColor.argtypes = [c_void_p] + [ctypes.c_double] * 4
CG.CGContextFillRect.restype = None
CG.CGContextFillRect.argtypes = [c_void_p, CGRect]
CG.CGContextTranslateCTM.restype = None
CG.CGContextTranslateCTM.argtypes = [c_void_p, ctypes.c_double, ctypes.c_double]
CG.CGContextScaleCTM.restype = None
CG.CGContextScaleCTM.argtypes = [c_void_p, ctypes.c_double, ctypes.c_double]
CG.CGContextDrawPDFPage.restype = None
CG.CGContextDrawPDFPage.argtypes = [c_void_p, c_void_p]
CG.CGBitmapContextCreateImage.restype = c_void_p
CG.CGBitmapContextCreateImage.argtypes = [c_void_p]
CG.CGImageRelease.restype = None
CG.CGImageRelease.argtypes = [c_void_p]

CG.CGContextDrawImage.restype = None
CG.CGContextDrawImage.argtypes = [c_void_p, CGRect, c_void_p]
CG.CGContextSetInterpolationQuality.restype = None
CG.CGContextSetInterpolationQuality.argtypes = [c_void_p, ctypes.c_int]
kCGInterpolationHigh = 3

# ── ImageIO ───────────────────────────────────────────────────────────────────
JPEG_UTI = cfstr("public.jpeg")

II.CGImageDestinationCreateWithURL.restype = c_void_p
II.CGImageDestinationCreateWithURL.argtypes = [c_void_p, c_void_p, c_size_t, c_void_p]
II.CGImageDestinationAddImage.restype = None
II.CGImageDestinationAddImage.argtypes = [c_void_p, c_void_p, c_void_p]
II.CGImageDestinationFinalize.restype = c_bool
II.CGImageDestinationFinalize.argtypes = [c_void_p]

# ── Settings ──────────────────────────────────────────────────────────────────
PDF_PATH = "public/extraits/extrait-tu-pries.pdf"
OUT_DIR  = "public/extraits/pages"
TARGET_W = 840
TARGET_H = 1190
SS       = 4                           # supersample factor (render 4×, downsample)
RENDER_W = TARGET_W * SS              # 3360 px
RENDER_H = TARGET_H * SS              # 4760 px

args_raw = sys.argv[1:]
force    = "--force" in args_raw
n_pages  = next((int(a) for a in args_raw if a.isdigit()), 20)

# ── Conversion ────────────────────────────────────────────────────────────────
os.makedirs(OUT_DIR, exist_ok=True)

url = cfurl(PDF_PATH)
doc = CG.CGPDFDocumentCreateWithURL(url)
CF.CFRelease(url)

if not doc:
    print(f"Error: cannot open {PDF_PATH}")
    sys.exit(1)

total  = CG.CGPDFDocumentGetNumberOfPages(doc)
count  = min(n_pages, total)
cs     = CG.CGColorSpaceCreateDeviceRGB()

print(f"PDF: {total} pages  →  converting {count}")
print(f"Render: {RENDER_W}×{RENDER_H} ({SS}× SS) → {TARGET_W}×{TARGET_H} JPEG @ 92%\n")

for i in range(1, count + 1):
    name    = f"page-{i:02d}.jpg"
    out_path = os.path.join(OUT_DIR, name)

    if not force and os.path.exists(out_path):
        print(f"  p{i:02d}  skip  {name}  (use --force to overwrite)")
        continue

    page = CG.CGPDFDocumentGetPage(doc, i)
    if not page:
        print(f"  p{i:02d}  SKIP  (page not found in PDF)")
        continue

    rect = CG.CGPDFPageGetBoxRect(page, kCGPDFMediaBox)
    pw, ph = rect.width, rect.height

    # Scale to fill render canvas, preserving PDF aspect ratio
    s  = min(RENDER_W / pw, RENDER_H / ph)
    dw = pw * s
    dh = ph * s
    ox = (RENDER_W - dw) / 2
    oy = (RENDER_H - dh) / 2

    # ── Step 1: render PDF page at 4× resolution ──────────────────────────
    row_large  = RENDER_W * 4
    buf_large  = (ctypes.c_uint8 * (row_large * RENDER_H))()
    ctx_large  = CG.CGBitmapContextCreate(
        buf_large, RENDER_W, RENDER_H, 8, row_large, cs, BITMAP_INFO
    )
    CG.CGContextSetRGBFillColor(ctx_large, 1.0, 1.0, 1.0, 1.0)
    CG.CGContextFillRect(ctx_large, CGRect(0, 0, RENDER_W, RENDER_H))
    CG.CGContextTranslateCTM(ctx_large, ox, oy)
    CG.CGContextScaleCTM(ctx_large, s, s)
    CG.CGContextDrawPDFPage(ctx_large, page)
    img_large = CG.CGBitmapContextCreateImage(ctx_large)
    CG.CGContextRelease(ctx_large)

    # ── Step 2: high-quality downsample to 840×1190 ────────────────────────
    row_small = TARGET_W * 4
    buf_small = (ctypes.c_uint8 * (row_small * TARGET_H))()
    ctx_small = CG.CGBitmapContextCreate(
        buf_small, TARGET_W, TARGET_H, 8, row_small, cs, BITMAP_INFO
    )
    CG.CGContextSetInterpolationQuality(ctx_small, kCGInterpolationHigh)
    CG.CGContextDrawImage(ctx_small, CGRect(0, 0, TARGET_W, TARGET_H), img_large)
    CG.CGImageRelease(img_large)
    img_small = CG.CGBitmapContextCreateImage(ctx_small)
    CG.CGContextRelease(ctx_small)

    # ── Step 3: save as JPEG ───────────────────────────────────────────────
    out_url = cfurl(out_path)
    dest    = II.CGImageDestinationCreateWithURL(out_url, JPEG_UTI, 1, None)
    CF.CFRelease(out_url)
    II.CGImageDestinationAddImage(dest, img_small, JPEG_PROPS)
    II.CGImageDestinationFinalize(dest)
    CF.CFRelease(dest)
    CG.CGImageRelease(img_small)

    print(f"  p{i:02d}  →  {name}")

CG.CGColorSpaceRelease(cs)
print(f"\nDone — {count} pages saved to {OUT_DIR}/")
