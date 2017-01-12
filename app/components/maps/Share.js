import React from 'react';

function Share() {
  return (
    <div className="c-share">
      <a href={`mailto:?body=I think you could be interested on this website: ${window.location.href}`} className="share-btn -mail">
        <svg width="20" height="16" viewBox="0 0 20 16"><title>rrss_email</title><path d="M10 10.159c-.333 0-.625-.12-1.25-.427L0 5.08v8.89c0 .698.563 1.27 1.25 1.27h17.5c.688 0 1.25-.572 1.25-1.27v-8.89l-8.75 4.653c-.625.307-.917.427-1.25.427zM18.75 0H1.25C.562 0 0 .571 0 1.27v.962l10 5.34 10-5.34V1.27C20 .57 19.437 0 18.75 0z" fillRule="evenodd" /></svg>
      </a>
      <a href="http://www.facebook.com/sharer/sharer.php%" target="_blank" className="share-btn -facebook">
        <svg width="8" height="18" viewBox="0 0 8 18"><title>rrss_facebook</title><path d="M8 5.828H5.275V3.96c0-.701.445-.865.759-.865h1.922V.011L5.308 0C2.368 0 1.7 2.3 1.7 3.773v2.055H0v3.179h1.7V18h3.575V9.007h2.413L8 5.828z" fillRule="evenodd" /></svg>
      </a>
      <a href="http://www.twitter.com/share" target="_blank" className="share-btn -twitter">
        <svg width="20" height="17" viewBox="0 0 20 17"><title>rrss_twitter</title><path d="M20 2.012a7.867 7.867 0 0 1-2.357.675A4.279 4.279 0 0 0 19.448.314a8.002 8.002 0 0 1-2.606 1.04A4.02 4.02 0 0 0 13.846 0C11.58 0 9.744 1.921 9.744 4.291c0 .336.035.665.105.978C6.44 5.09 3.416 3.382 1.392.785a4.43 4.43 0 0 0-.556 2.158c0 1.49.725 2.802 1.825 3.573a3.955 3.955 0 0 1-1.858-.537v.053c0 2.08 1.414 3.815 3.291 4.21a3.96 3.96 0 0 1-1.852.073c.521 1.704 2.037 2.945 3.832 2.98A8.005 8.005 0 0 1 0 15.073 11.256 11.256 0 0 0 6.29 17c7.547 0 11.674-6.54 11.674-12.21 0-.186-.005-.372-.012-.556A8.546 8.546 0 0 0 20 2.012z" fillRule="evenodd" /></svg>
      </a>
      <div className="share-btn -share">
        <svg width="16" height="14" viewBox="0 0 16 14"><path fillRule="evenodd" d="M14.164 5.056l-2.612-2.657v.84c0 .385-.301.697-.685.697-2.136 0-3.78.572-4.902 1.7a5.285 5.285 0 0 0-1.092 1.63C6.494 6.3 8.541 6.126 9.8 6.126c.65 0 1.08.047 1.143.054.352.04.609.338.609.693v.84l2.612-2.657zm1.494.489l-4.285 4.359a.702.702 0 0 1-1.2-.49V7.53c-1.38-.04-4.695.1-5.89 2.226a.692.692 0 0 1-1.298-.34c0-.111.009-2.768 1.993-4.764C6.24 3.382 7.931 2.68 10.173 2.56V.697a.702.702 0 0 1 1.198-.49l4.285 4.36a.699.699 0 0 1 .002.978zm-3.072 6.433v.87c0 .385-.325.596-.71.596H.626c-.385 0-.626-.211-.626-.596V4.324C0 3.939.241 3.6.626 3.6h2.02a.691.691 0 1 1 0 1.382H1.379v7.08h9.828v-.084c0-.385.305-.697.69-.697.384 0 .69.312.69.697z" /></svg>
      </div>
    </div>
  );
}

Share.propTypes = {};

export default Share;
