/* eslint-disable no-unused-vars */
import Handsontable from 'handsontable';

/**
 * @private
 * @renderer ReadOnlyRenderer
 * @param instance
 * @param TD
 * @param row
 * @param col
 * @param prop
 * @param value
 * @param cellProperties
 */
const ReadOnlyRenderer = function (
  instance,
  td,
  row,
  col,
  prop,
  value,
  cellProperties,
) {
  // eslint-disable-next-line prefer-rest-params
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  td.style.backgroundColor = '#999';
  const { rootDocument } = instance;
  const custom = rootDocument.createElement('div');
  custom.innerText = '这是自定义的render'
  td.appendChild(custom)

};
export default ReadOnlyRenderer;
