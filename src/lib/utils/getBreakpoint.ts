export function getBreakpoint() {
	if (window.matchMedia('(max-width: 639px)').matches) {
		return 'sm';
	} else if (window.matchMedia('(min-width: 640px) and (max-width: 767px)').matches) {
		return 'md';
	} else if (window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches) {
		return 'lg';
	} else {
		return 'xl';
	}
}
