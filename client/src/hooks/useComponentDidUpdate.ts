import { useEffect, useRef } from 'react';

export const useComponentDidUpdate = (fn: React.EffectCallback, deps?: React.DependencyList) => {
	const mounted = useRef<boolean>(false);

	useEffect(() => {
		if (!mounted.current) {
			mounted.current = true;
		} else {
			fn();
		}
	}, [deps, fn, mounted]);
};
