import { Component, EventEmitter, Input, Output } from '@angular/core';

type Position = {
  x: number,
  y: number
};

type Anchor = {
  top: number,
  left: number
};

@Component({
  selector: 'Zoomable',
  templateUrl: './ngx-instagram-zoom.component.html',
})
export class NgxInstagramZoomComponent {
  @Input() zIndex = Number.MAX_SAFE_INTEGER;
  @Input() maxScale = Number.MAX_SAFE_INTEGER;
  @Input() releaseAnimationTimeout = 500;
  @Input() style = {};
  @Input() className = '';

  @Output() onTouchStartEmitter: EventEmitter<TouchEvent> = new EventEmitter<TouchEvent>();
  @Output() onTouchMoveEmitter: EventEmitter<TouchEvent> = new EventEmitter<TouchEvent>();
  @Output() onTouchEndEmitter: EventEmitter<TouchEvent> = new EventEmitter<TouchEvent>();
  @Output() onReleaseAnimationStart: EventEmitter<TouchEvent> = new EventEmitter<TouchEvent>();
  @Output() onReleaseAnimationEndEmitter: EventEmitter<TouchEvent> = new EventEmitter<TouchEvent>();

  public initialDistance = 0;
  public initialAbsolutePositionX = 0;
  public initialAbsolutePositionY = 0;
  public zoom = 0;
  public moveLeft = 0;
  public moveTop = 0;

  public anchorLeftPercentage = 50;
  public anchorTopPercentage = 50;
  public isMoving = false;
  public releaseAnimationDone = true;

  private timeout;

  public touchStart(touchEvent: TouchEvent): void {
    if (touchEvent && touchEvent.touches && touchEvent.touches.length === 2) {
      this.isMoving = true;
      this.releaseAnimationDone = false;
      this.twoFingerTouchStart(touchEvent);

      // On touch start callback
      this.onTouchStartEmitter.emit(touchEvent);
    }
  }

  public touchMove(touchEvent: TouchEvent): void {
    if (touchEvent && touchEvent.touches && touchEvent.touches.length === 2) {
      this.twoFingerTouchMove(touchEvent);

      // On touch move callback
      this.onTouchMoveEmitter.emit(touchEvent);
    }
  }

  public touchCancel(touchEvent: TouchEvent): void {
    this.twoFingerTouchStop(touchEvent);
  }

  public touchEnd(touchEvent: TouchEvent): void {
    this.twoFingerTouchStop(touchEvent);
  }

  public twoFingerTouchStop(touchEvent: TouchEvent): void {
    this.isMoving = false;
    this.initialDistance = 0;
    this.initialAbsolutePositionX = 0;
    this.initialAbsolutePositionY = 0;
    this.zoom = 0;
    this.moveLeft = 0;
    this.moveTop = 0;
    this.anchorLeftPercentage = 50;
    this.anchorTopPercentage = 50;

    // Touch end callback
    this.onTouchEndEmitter.emit(touchEvent);

    // Release animation start callback
    this.onReleaseAnimationStart.emit(touchEvent);

    // Release
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.releaseAnimationDone = true;

      // Release animation end callback
      this.onReleaseAnimationEndEmitter.emit(touchEvent);
    }, this.releaseAnimationTimeout);
  }

  public twoFingerTouchMove(touchEvent): void {
    touchEvent.preventDefault();
    const { distance, absolutePosition } = this.getTouchData(touchEvent);

    // Calculate zoom
    const currentZoom = Math.max(0, distance - this.initialDistance);
    this.zoom = currentZoom;

    // Calculate move x
    const currentMoveX = absolutePosition.x - this.initialAbsolutePositionX;
    this.moveLeft = currentMoveX;

    // Calculate move y
    const currentMoveY = absolutePosition.y - this.initialAbsolutePositionY;
    this.moveTop = currentMoveY;

    // Update initial, if zoom 0 (e.g. zooming out more than possible)
    if (currentZoom <= 0) {
      this.initialDistance = distance;
    }
  }

  public getTransformOrigin(): string {
    return `${this.anchorLeftPercentage}% ${this.anchorTopPercentage}%`;
  }
  public getTransform(): string {
    const scale = Math.min(this.maxScale, 1 + (this.zoom / 100));
    return `translate(${this.moveLeft}px, ${this.moveTop}px) scale(${scale})`;
  }
  public getTransition(): string {
    return !this.isMoving
      ? `
        ${this.releaseAnimationTimeout}ms transform,
        ${this.releaseAnimationTimeout}ms transform-origin,
        ${this.releaseAnimationTimeout}ms z-index,
        ${this.releaseAnimationTimeout}ms position
      `
      : undefined;
  }

  private getTouchData(touchEvent): { distance: number, absolutePosition: Position, anchor: Anchor } {
    const elBox = touchEvent.target && touchEvent.target.getBoundingClientRect();

    const touch1 = touchEvent.touches && touchEvent.touches[0];
    const touch2 = touchEvent.touches && touchEvent.touches[1];

    const x1 = touch1.clientX;
    const y1 = touch1.clientY;

    const x2 = touch2.clientX;
    const y2 = touch2.clientY;

    const distance = Math.round(
      Math.sqrt(
        ((x2 - x1) ** 2) + ((y2 - y1) ** 2)
      )
    );
    const relativePosition = {
      x: Math.round(((x1 - elBox.left) + (x2 - elBox.left)) / 2),
      y: Math.round(((y1 - elBox.top) + (y2 - elBox.top)) / 2),
    };
    const absolutePosition = {
      x: Math.round((x1 + x2) / 2),
      y: Math.round((y1 + y2) / 2),
    };
    const anchor = {
      left: Math.round((relativePosition.x / elBox.width) * 100),
      top: Math.round((relativePosition.y / elBox.height) * 100)
    };

    return {
      distance,
      absolutePosition,
      anchor,
    };
  }

  // Touch start handler
  private twoFingerTouchStart(touchEvent): void {
    touchEvent.preventDefault();
    const { distance, absolutePosition, anchor } = this.getTouchData(touchEvent);

    // Set initial distance
    this.initialDistance = distance;

    // Set initial absolute position xy
    this.initialAbsolutePositionX = (absolutePosition && absolutePosition.x) || 0;
    this.initialAbsolutePositionY = (absolutePosition && absolutePosition.y) || 0;

    // Set anchor
    this.anchorTopPercentage = anchor.top;
    this.anchorLeftPercentage = anchor.left;
  }
}
