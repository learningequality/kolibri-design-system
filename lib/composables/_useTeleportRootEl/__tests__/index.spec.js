describe('_useTeleportRootEl', () => {
  // this is taken care of by KThemePlugin.js that is already registered
  // in the global jest setup
  it(`document body contains k-teleport root element upon the KDS plugin initialization`, () => {
    expect(`
      <div id="k-teleport">
      </div>
    `).toBeInDom();
  });
});
