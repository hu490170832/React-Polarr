import React, {useContext, useEffect, useRef, useState} from 'react';
import {Context} from "../../Context";
import {mapValue} from "../../render/GLUtil";
import {H1, H2, InnerWrapper, LB, LT, MB, ML, MR, MT, RB, RT, V1, V2, Wrapper} from "./ResizeBoxStyle";
import {clamp, getLastState, switchHandler} from "../../lib/util";
import {ActionType} from "../../types/type";


const xMapValue = mapValue(-1, 1, 0, 1);
const yMapValue = mapValue(-1, 1, 1, 0);
type HandlerType = (initLeft: number, initRight: number, initTop: number, initBottom: number, offsetX: number, offsetY: number) => void;
export const ResizeBox: React.FC = () => {
    const {state: states, dispatch} = useContext(Context);
    const layer = getLastState(states.historyLayers);
    const container = useRef<HTMLDivElement>(null);


    const nw = (initLeft: number, initRight: number, initTop: number, initBottom: number, offsetX: number, offsetY: number) => {
        if (layer) {
            let offsetXPercent = offsetX / (window.innerWidth * (layer.originPosition.x2 - layer.originPosition.x1) / 2);
            let offsetYPercent = offsetY / (window.innerHeight * (layer.originPosition.y2 - layer.originPosition.y1) / 2);
            let top = initTop + offsetYPercent;
            let left = initLeft + offsetXPercent;
            top = clamp(top, 0, 1);
            left = clamp(left, 0, 1);
            dispatch({type: ActionType.updateTransform, payload: {
                    ...layer.transform,
                    top: top,
                    left: left
                }});
        }
    };
    const n = (initLeft: number, initRight: number, initTop: number, initBottom: number, offsetX: number, offsetY: number) => {
        if (layer) {
            let offsetYPercent = offsetY / (window.innerHeight * (layer.originPosition.y2 - layer.originPosition.y1) / 2);
            let top = initTop + offsetYPercent;
            top = clamp(top, 0, 1);
            dispatch({type: ActionType.updateTransform, payload: {
                    ...layer.transform,
                    top: top
                }});
        }

    };
    const ne = (initLeft: number, initRight: number, initTop: number, initBottom: number, offsetX: number, offsetY: number) => {
        if (layer) {
            let offsetXPercent = offsetX / (window.innerWidth * (layer.originPosition.x2 - layer.originPosition.x1) / 2);
            let offsetYPercent = offsetY / (window.innerHeight * (layer.originPosition.y2 - layer.originPosition.y1) / 2);
            let top = initTop + offsetYPercent;
            let right = initRight - offsetXPercent;
            top = clamp(top, 0, 1);
            right = clamp(right, 0, 1);
            dispatch({type: ActionType.updateTransform, payload: {
                    ...layer.transform,
                    top: top,
                    right: right
                }});
        }
    };
    const w = (initLeft: number, initRight: number, initTop: number, initBottom: number, offsetX: number, offsetY: number) => {
        if (layer) {
            let offsetXPercent = offsetX / (window.innerWidth * (layer.originPosition.x2 - layer.originPosition.x1) / 2);
            let left = initLeft + offsetXPercent;
            left = clamp(left, 0, 1);
            dispatch({type: ActionType.updateTransform, payload: {
                    ...layer.transform,
                    left: left
                }});
        }
    };
    const drag = (initLeft: number, initRight: number, initTop: number, initBottom: number, offsetX: number, offsetY: number) => {
        if (layer) {
            let offsetXPercent = offsetX / (window.innerWidth * (layer.originPosition.x2 - layer.originPosition.x1) / 2);
            let offsetYPercent = offsetY / (window.innerHeight * (layer.originPosition.y2 - layer.originPosition.y1) / 2);
            let top = initTop + offsetYPercent;
            let right = initRight - offsetXPercent;
            let left = initLeft + offsetXPercent;
            let bottom = initBottom - offsetYPercent;
            if (top < 0) {
                top = 0;
                bottom = initBottom + initTop;
            } else if (bottom < 0) {
                bottom = 0;
                top = initTop + initBottom;
            }

            if (left < 0) {
                left = 0;
                right = initRight + initLeft
            } else if (right < 0) {
                right = 0;
                left = initLeft + initRight;
            }
            if (top < 0 || bottom < 0 || left < 0 || right < 0) return;
            dispatch({type: ActionType.updateTransform, payload: {
                    ...layer.transform,
                    top: top,
                    right: right,
                    left,
                    bottom
                }});
        }
    };

    const e = (initLeft: number, initRight: number, initTop: number, initBottom: number, offsetX: number, offsetY: number) => {
        if (layer) {
            let offsetXPercent = offsetX / (window.innerWidth * (layer.originPosition.x2 - layer.originPosition.x1) / 2);
            let right = initRight - offsetXPercent;
            right = clamp(right, 0, 1);
            dispatch({type: ActionType.updateTransform, payload: {
                    ...layer.transform,
                    right: right
                }});
        }
    };

    const sw = (initLeft: number, initRight: number, initTop: number, initBottom: number, offsetX: number, offsetY: number) => {
        if (layer) {
            let offsetXPercent = offsetX / (window.innerWidth * (layer.originPosition.x2 - layer.originPosition.x1) / 2);
            let offsetYPercent = offsetY / (window.innerHeight * (layer.originPosition.y2 - layer.originPosition.y1) / 2);
            let bottom = initBottom - offsetYPercent;
            let left = initLeft + offsetXPercent;
            bottom = clamp(bottom, 0, 1);
            left = clamp(left, 0, 1);
            dispatch({type: ActionType.updateTransform, payload: {
                    ...layer.transform,
                    bottom: bottom,
                    left: left
                }});
        }
    };

    const s = (initLeft: number, initRight: number, initTop: number, initBottom: number, offsetX: number, offsetY: number) => {
        // container.style.height = initHeight + offsetY + 'px';
        if (layer) {
            let offsetYPercent = offsetY / (window.innerHeight * (layer.originPosition.y2 - layer.originPosition.y1) / 2);
            let bottom = initBottom - offsetYPercent;
            bottom = clamp(bottom, 0, 1);
            dispatch({type: ActionType.updateTransform, payload: {
                    ...layer.transform,
                    bottom: bottom,
                }});
        }
    };

    const se = (initLeft: number, initRight: number, initTop: number, initBottom: number, offsetX: number, offsetY: number) => {
        // container.style.width = initWidth + offsetX + 'px';
        // container.style.height = initHeight + offsetY + 'px';
        if (layer) {
            let offsetXPercent = offsetX / (window.innerWidth * (layer.originPosition.x2 - layer.originPosition.x1) / 2);
            let offsetYPercent = offsetY / (window.innerHeight * (layer.originPosition.y2 - layer.originPosition.y1) / 2);
            let right = initRight - offsetXPercent;
            let bottom = initBottom - offsetYPercent;
            right = clamp(right, 0, 1);
            bottom = clamp(bottom, 0, 1);
            dispatch({type: ActionType.updateTransform, payload: {
                    ...layer.transform,
                    bottom: bottom,
                    right: right
                }});
        }
    };
    const handlers: HandlerType[] = [nw, n, ne, w, drag, e, sw, s, se];
    let currentHandler: HandlerType | null = null;
    let leftBoundary, rightBoundary, topBoundary, bottomBoundary;
    const [isFirst, setIsFirst] = useState(true);
    const touchStart = function (this: HTMLElement, e: TouchEvent) {
        e.preventDefault();
        if (!container.current || !layer) return;
        leftBoundary = container.current.offsetLeft;
        rightBoundary = leftBoundary + container.current.offsetWidth;
        topBoundary = container.current.offsetTop;
        bottomBoundary = topBoundary + container.current.offsetHeight;
        let initLeft = layer.transform.left;
        let initRight = layer.transform.right;
        let initTop = layer.transform.top;
        let initBottom = layer.transform.bottom;
        let relativeX = e.touches[0].clientX - this.offsetLeft;
        let relativeY = e.touches[0].clientY - this.offsetTop;
        if (isFirst) {
            dispatch({type: ActionType.addHistory, payload: '变换'});
            setIsFirst(false);
        }

        currentHandler = switchHandler<HandlerType>(leftBoundary, rightBoundary, topBoundary, bottomBoundary, relativeX, relativeY, handlers);
        const touchMove = (ev: TouchEvent) => {
            ev.preventDefault();
            let offsetX = ev.touches[0].clientX - e.touches[0].clientX;
            let offsetY = ev.touches[0].clientY - e.touches[0].clientY;
            if (currentHandler && container.current) {
                currentHandler(initLeft, initRight, initTop, initBottom, offsetX, offsetY);
            }
        };
        const touchEnd = (e: TouchEvent) => {
            dispatch({type: ActionType.updatePosition, payload: {}});
            document.removeEventListener('touchmove', touchMove);
            document.removeEventListener('touchend', touchEnd);
        };
        document.addEventListener('touchmove', touchMove, {passive: false});
        document.addEventListener('touchend', touchEnd);

    };
    useEffect(() => {
        let canvas = document.getElementById('canvas');
        if (canvas && canvas.parentElement) {
            canvas.parentElement.addEventListener('touchstart', touchStart);
        }
        return () => {
            if (canvas && canvas.parentElement) {
                canvas.parentElement.removeEventListener('touchstart', touchStart);
            }
        }
    });
    let left = 0, right = 0, top = 0, bottom = 0;
    let maskLeft = 0;
    if (layer) {
        maskLeft = xMapValue(layer.originPosition.x1);
        left = xMapValue(layer.originPosition.x1 + layer.transform.left * (layer.originPosition.x2 - layer.originPosition.x1));
        right = xMapValue(layer.originPosition.x2 - layer.transform.right * (layer.originPosition.x2 - layer.originPosition.x1));
        top = yMapValue(layer.originPosition.y2 - layer.transform.top * (layer.originPosition.y2 - layer.originPosition.y1));
        bottom = yMapValue(layer.originPosition.y1 + layer.transform.bottom * (layer.originPosition.y2 - layer.originPosition.y1));
    }
    return (
        <div>
            <Wrapper ref={container} style={{
                left: `${left * 100}%`,
                width: `${(right - left) * 100}%`,
                top: `${top * 100}%`,
                height: `${(bottom - top) * 100}%`
            }}>
                <LT/>
                <RT/>
                <LB/>
                <RB/>
                <MT/>
                <MB/>
                <ML/>
                <MR/>
                <InnerWrapper>
                    <H1/>
                    <H2/>
                    <V1/>
                    <V2/>
                </InnerWrapper>
            </Wrapper>

            {/*<div className="mask" style={{*/}
            {/*    position: "absolute",*/}
            {/*    left: 0,*/}
            {/*    width: `${100}%`,*/}
            {/*    top: 0,*/}
            {/*    height: `100%`,*/}
            {/*    clipPath: `polygon(*/}
            {/*    0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%,*/}
            {/*    ${left * 100}% ${top * 100}%, ${left * 100}% ${bottom * 100}%, ${right * 100}% ${bottom * 100}%, ${right * 100}% ${top * 100}%, ${left * 100}% ${top * 100}%*/}
            {/*    )`,*/}
            {/*    backgroundColor: '#000000aa'*/}
            {/*}}/>*/}

        </div>
    )
};