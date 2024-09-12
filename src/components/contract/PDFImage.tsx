'use client';
import { useEffect, useRef } from 'react';

export default function App() {
	const containerRef = useRef(null);

	

	return <div ref={containerRef} style={{ height: '100vh' }} />;
}