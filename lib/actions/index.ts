// lib/actions/index.ts
// Centralized exports for all server actions

export { getProjects, getProjectBySlug, getProjectsByType, getFeaturedProjects } from './projects';
export { getTeamMembers, getTeamBySection, getTeamMemberBySlug } from './team';
export { getJobs, getJobBySlug, getFeaturedJobs } from './jobs';
export { getSiteMetadata, getPageMetadata, getContentBlock } from './metadata';
