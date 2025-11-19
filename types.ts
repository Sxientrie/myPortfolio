import React from 'react';

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  type: 'tech' | 'other';
}

export interface Education {
  institution: string;
  period: string;
  details: string;
}

export interface Skill {
  name: string;
  category: 'tool' | 'platform' | 'design' | 'version-control';
  icon?: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  type: 'dev' | 'system';
  // Detailed fields for Slide-Over Drawer
  longDescription?: string;
  architecture?: { label: string; value: string }[];
  features?: string[];
  links?: { label: string; url: string }[];
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  portfolio: string;
}