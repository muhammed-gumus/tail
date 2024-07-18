import * as Margin from "./Margin";
import * as Alignment from "./Alignment";
import * as Width from "./Width";
import * as Font from "./Font";
import { ItemContent } from "./Resume";
import { Box } from "./Box";
import { ElementPath, FontDict } from "./AnyLayout";
import { Point } from "./Point";
import * as Stack from "./Stack";
import * as Row from "./Row";
import * as Elem from "./Elem";
import { Field } from "./DataSchema";
export type Container = Stack.t | Row.t;
export type t = Stack.t | Row.t | Elem.t;
type Layout = t;
export type RenderedStack = Stack.t & {
    bounding_box: Box;
    elements: RenderedLayout[];
};
export type RenderedRow = Row.t & {
    bounding_box: Box;
    elements: RenderedLayout[];
};
export type RenderedElem = Elem.t & {
    bounding_box: Box;
};
export type RenderedLayout = (RenderedStack | RenderedRow | RenderedElem) & {
    path?: ElementPath;
};
export declare function default_(tag: string): Stack.t | Row.t | Elem.t;
export declare function empty(): Layout;
export declare function fromJson(json: unknown): Layout;
export declare function type_(l: Layout): string;
export declare function tag_(l: Layout): string;
export declare function toJson(l: Layout): unknown;
export declare function isContainer(l: Layout): boolean;
export declare function isFill(l: Layout): boolean;
export declare function isRef(l: Layout): boolean;
export declare function fonts(l: Layout): Font.t[];
export declare function withMargin(l: Layout, margin: Margin.t): Layout;
export declare function withAlignment(l: Layout, alignment: Alignment.t): Layout;
export declare function withWidth(l: Layout, width: Width.t): Layout;
export declare function totalElementsWidth(l: Layout): number;
export declare function isInstantiated(l: Layout): boolean;
export declare function instantiate(l: Layout, section: Map<string, ItemContent>, fields: Field.t[]): Layout;
export declare function boundWidth(l: Layout, width: number): Layout;
export declare function scaleWidth(l: Layout, document_width: number): Layout;
export declare function normalize(l: Layout, width: number, font_dict: FontDict): Layout;
export declare function fillFonts(l: Layout, font_dict: FontDict): Layout;
export declare function breakLines(l: Layout, font_dict: FontDict): Layout;
export declare function computeBoxes(l: Layout, font_dict: FontDict): RenderedLayout;
export declare function computeTextboxPositions(l: Layout, top_left: Point, font_dict: FontDict): {
    depth: number;
    renderedLayout: RenderedLayout;
};
export type Color = "Transparent" | "Light Yellow" | "Light Brown" | "Light Green" | "Light Beige" | "Light Blue" | "Blue";
export declare const ColorMap: {
    Transparent: string;
    "Light Yellow": string;
    "Light Brown": string;
    "Light Green": string;
    "Light Beige": string;
    "Light Blue": string;
    Blue: string;
};
export {};
