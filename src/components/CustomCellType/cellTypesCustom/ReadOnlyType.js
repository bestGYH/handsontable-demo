import ReadOnlyEditor from "../editorsCustom/ReadOnlyEditor";
// import Handsontable from 'handsontable';
import ReadOnlyRenderer from "../renderersCustom/ReadOnlyRenderer";


export default {
  editor: ReadOnlyEditor,
  // renderer: Handsontable.renderers.TextRenderer,
  renderer:ReadOnlyRenderer,
  readOnly:true,
  className:"custom-cell"
};
