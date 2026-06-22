declare module "page-flip" {
  export interface PageFlipOptions {
    width: number;
    height: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
    startPage?: number;
  }

  export type FlipCorner = "top" | "bottom";

  export class PageFlip {
    constructor(element: HTMLElement, settings: PageFlipOptions);
    loadFromImages(images: string[]): void;
    loadFromHTML(items: NodeListOf<Element> | Element[]): void;
    flipPrev(corner?: FlipCorner): void;
    flipNext(corner?: FlipCorner): void;
    flip(pageNum: number, corner?: FlipCorner): void;
    on(event: "flip" | "changeOrientation" | "changeState" | "init" | "update", cb: (e: { data: number | string }) => void): void;
    off(event: string): void;
    destroy(): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
  }
}
