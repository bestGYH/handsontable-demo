import Handsontable from 'handsontable';


class ReadOnlyEditor extends Handsontable.editors.TextEditor {
  createElements() {
    super.createElements();
    this.TEXTAREA.setAttribute("disabled", true);
    this.TEXTAREA.className += " handsontableInput-readOnly";
  }

  prepare(row, col, prop, td, originalValue, cellProperties) {
    cellProperties.readOnly = true;
    super.prepare(row, col, prop, td, originalValue, cellProperties);
  }
}
export default ReadOnlyEditor;
