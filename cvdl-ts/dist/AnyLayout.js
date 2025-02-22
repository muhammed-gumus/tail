"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FontDict = void 0;
exports.render = render;
const ResumeLayout_1 = require("./ResumeLayout");
const fontkit = __importStar(require("fontkit"));
const Layout = __importStar(require("./Layout"));
const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
class FontDict {
    constructor() {
        this.fonts = new Map();
    }
    async load_fonts(storage) {
        const variants = cartesian(["Exo", "OpenSans", "SourceCodePro"], ["Medium", "Bold"], ["", "Italic"]);
        await Promise.all(variants.map(async ([name, weight, style]) => {
            const fontName = `${name}-${weight}${style}`;
            if (this.fonts.has(fontName)) {
                console.log(`Font ${fontName} is already loaded`);
                return;
            }
            const font_data = await storage.load_font(fontName);
            const fontkit_font = fontkit.create(font_data);
            this.fonts.set(fontName, fontkit_font);
        }));
        return this;
    }
    get_font(name) {
        const font = this.fonts.get(name);
        if (font === undefined) {
            throw new Error(`Could not find font ${name}`);
        }
        return font;
    }
}
exports.FontDict = FontDict;
function render({ resume, layout_schemas, data_schemas, resume_layout, bindings, fontDict, }) {
    // Compute the total usable width by subtracting the margins from the document width
    const width = resume_layout.width -
        (resume_layout.margin.left + resume_layout.margin.right);
    // If the resume is double column, then the usable width is halved
    const column_width = resume_layout.column_type.tag === "SingleColumn"
        ? width
        : width - (0, ResumeLayout_1.vertical_margin)(resume_layout.column_type) / 2.0;
    const layouts = [];
    console.info("Rendering sections...");
    for (const section of resume.sections) {
        // Render Section Header
        // 1. Find the layout schema for the section
        console.info("Computing section: ", section.section_name);
        const layout_schema = layout_schemas.find((s) => s.schema_name === section.layout_schema);
        if (layout_schema === undefined) {
            throw new Error(`Could not find layout schema ${section.layout_schema}`);
        }
        let start_time = Date.now();
        // await fontDict.load_fonts_from_schema(layout_schema, storage);
        let end_time = Date.now();
        console.info(`Font loading time: ${end_time - start_time}ms for section ${section.section_name}`);
        // 2. Find the data schema for the section
        const data_schema = data_schemas.find((s) => s.schema_name === section.data_schema);
        if (data_schema === undefined) {
            throw new Error(`Could not find data schema ${section.data_schema}`);
        }
        start_time = Date.now();
        // 3. Render the header
        const layout = Layout.computeBoxes(Layout.normalize(Layout.instantiate(layout_schema.header_layout_schema, section.data, data_schema.header_schema, bindings), column_width, fontDict), fontDict);
        layout.path = { tag: "section", section: section.section_name };
        console.info("Header is computed");
        layouts.push(layout);
        end_time = Date.now();
        console.info(`Header rendering time: ${end_time - start_time}ms for section ${section.section_name}`);
        start_time = Date.now();
        // Render Section Items
        for (const [index, item] of section.items.entries()) {
            // 3. Render the item
            const layout = Layout.computeBoxes(Layout.normalize(Layout.instantiate(layout_schema.item_layout_schema, item, data_schema.item_schema, bindings), column_width, fontDict), fontDict);
            layout.path = { tag: "item", section: section.section_name, item: index };
            layouts.push(layout);
        }
        end_time = Date.now();
        console.info(`Item rendering time: ${end_time - start_time}ms for section ${section.section_name}`);
    }
    console.log("Position calculations are completed.");
    return layouts;
}
