/**
 * @file: src/shared/types/project.ts
 *
 * @description: Defines the TypeScript interface for a Project entity.
 *
 * @module: Shared.Core
 *
 * @overview:
 * This file lays down the law for what it means to be a "project" in this application. It exports
 * a single TypeScript `interface`, `Project`, which acts as a data contract. Any object that wants
 * to be treated as a project must adhere to this shape, no exceptions. It's the blueprint that
 * ensures every project has a title, a description, and all the other required fields, preventing
 * the data from devolving into a chaotic mess. It's the boring, bureaucratic work that makes a
 * robust application possible.
 *
 * @dependencies:
 * ➥ None
 *
 * @outputs:
 * ➥ Project (interface)
 */
export interface Project {
	imagePlaceholder: string;
	title: string;
	description: string;
	tech: string[];
	githubUrl?: string;
	demoUrl?: string;
}