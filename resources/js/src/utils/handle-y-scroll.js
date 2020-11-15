export default () =>
    document.documentElement.style.setProperty(
        "--scroll-y",
        `${window.scrollY}px`
    );
