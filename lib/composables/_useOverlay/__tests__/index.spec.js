describe('_useOverlay', () => {
  // this is taken care of by KThemePlugin.js that is already registered
  // in the global jest setup
  it(`document body contains the overlay container element #k-overlay upon the KDS plugin initialization`, () => {
    expect(`
      <div id="k-overlay">
      </div>
    `).toBeInDom();
  });
});
