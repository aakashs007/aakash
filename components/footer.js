import SocialBtns from './socialBtns';

export default function Footer() {
  return (
    <footer>
      <div className="container-fluid p-lg-5 p-sm-4" style={{ padding: '20px', background: '#2b3036' }}>
        <h6 className="mb-3">
          <span style={{ color: '#ff6719' }}>Follow</span>
          {' '}
          my newsletter to dive deep into software engineering
        </h6>
        <a
          target="_blank"
          href="https://aakashcse.substack.com/"
          role="button"
          type="button"
          className="btn btn-primary border-0 mb-4 mt-4"
          aria-label="Subscribe to newsletter"
          style={{ background: '#ff6719' }}
          rel="noreferrer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-substack" viewBox="0 0 16 16">
            <path d="M15 3.604H1v1.891h14v-1.89ZM1 7.208V16l7-3.926L15 16V7.208zM15 0H1v1.89h14z" />
          </svg>
        &nbsp; Subscribe on Substack
        </a>
        <SocialBtns />
        <div className="mt-4 mb-4">
          © Aakash Singh
          {' '}
          {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
