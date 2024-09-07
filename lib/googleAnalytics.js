class GoogleAnalytics {
  sendEvent(eventName, eventParams = {}) {
    if (typeof window !== 'undefined' && window.gtag) {
      this.gtag = window.gtag;
    }

    if (this.gtag) {
      this.gtag('event', eventName, eventParams);
    } else {
      console.warn('Unable to send event: Google Analytics not initialized');
    }
  }
}

export default GoogleAnalytics;
