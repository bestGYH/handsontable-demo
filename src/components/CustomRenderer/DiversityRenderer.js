class DiversityRenderer  {
    constructor(instance) {
        /**
         * A reference to the source instance of the Handsontable.
         *
         * @type {Handsontable}
         */
        this.hot = instance;
      }
      diversityRenderer(instance, td, row, col, prop, value, cellProperties) {
        console.log('diversityRenderer',instance, td, row, col, prop, value, cellProperties);
        console.log(this.hot.getCellMeta(row,col));
        const img = document.createElement('img');
    
        img.src = value;
    
        img.addEventListener('mousedown', event => {
            event.preventDefault();
        });
    
        td.innerText = '';
        td.appendChild(img);
    
        return td;
    }
}
export default DiversityRenderer;
