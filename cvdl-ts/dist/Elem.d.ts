import * as Font from "./Font";
import { Alignment, Margin, Width } from ".";
import { Color } from "./Layout";
import { FontDict } from "./AnyLayout";
import { ItemContent } from "./Resume";
import { Field } from "./DataSchema";
import { Optional } from "./Utils";
import { Box } from "./Box";
export type Span = {
    is_italic: boolean;
    is_bold: boolean;
    is_code: boolean;
    text: string;
    link: string | null;
    font?: Font.t;
    width?: number;
    line?: number;
    bbox?: Box;
};
export type t = {
    tag: "Elem";
    item: string;
    text?: string;
    spans?: Span[];
    url: string | null;
    is_ref: boolean;
    is_fill: boolean;
    is_markdown: boolean;
    text_width: Width.t;
    font: Font.t;
    margin: Margin.t;
    alignment: Alignment.t;
    width: Width.t;
    background_color: Color;
};
type Elem = t;
export declare function elem(item: string, url: string | null, is_ref: boolean, is_fill: boolean, is_markdown: boolean, text_width: Width.t, font: Font.t, margin: Margin.t, alignment: Alignment.t, width: Width.t, background_color: Color): Elem;
export declare function copy(e: Elem): {
    tag: "Elem";
    item: string;
    text?: string;
    spans?: Span[];
    url: string;
    is_ref: boolean;
    is_fill: boolean;
    is_markdown: boolean;
    text_width: Width.t;
    font: Font.t;
    margin: Margin.t;
    alignment: Alignment.t;
    width: Width.t;
    background_color: Color;
};
export declare function default_(): Elem;
export declare function from(w: Optional<Elem>): Elem;
export declare function withItem(e: Elem, item: string): Elem;
export declare function withUrl(e: Elem, url: string | null): Elem;
export declare function withIsRef(e: Elem, is_ref: boolean): Elem;
export declare function asRef(e: Elem): Elem;
export declare function withIsFill(e: Elem, is_fill: boolean): Elem;
export declare function withTextWidth(e: Elem, text_width: Width.t): Elem;
export declare function withFont(e: Elem, font: Font.t): Elem;
export declare function withMargin(e: Elem, margin: Margin.t): Elem;
export declare function withAlignment(e: Elem, alignment: Alignment.t): Elem;
export declare function withWidth(e: Elem, width: Width.t): Elem;
export declare function withBackgroundColor(e: Elem, background_color: Color): Elem;
export declare function scaleWidth(e: Elem, scale: number): Elem;
export declare function parseMarkdownItem(item: string): Span[];
export declare function fillFonts(e: Elem, fonts: FontDict): Elem;
export declare function boundWidth(e: Elem, width: number): Elem;
export declare function instantiate(e: Elem, section: Map<string, ItemContent>, fields: Field.t[]): Elem;
export {};
