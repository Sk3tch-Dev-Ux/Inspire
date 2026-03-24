import type { Metadata } from 'next';
import GalleryContent from './Content';

export const metadata: Metadata = {
  title: 'Build Gallery',
  description: 'Explore our portfolio of custom PC builds — from high-end gaming rigs to professional workstations, built with expert craftsmanship.',
};

export default function GalleryPage() {
  return <GalleryContent />;
}
