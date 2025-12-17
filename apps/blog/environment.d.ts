/**
 * Environment variables for the blog app
 * See @origini/interfaces for shared environment type definitions
 */
declare namespace NodeJS {
  export interface ProcessEnv {
    // Common variables (from CommonEnvironmentVariables)
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly NEXT_PUBLIC_MEASUREMENT_ID: string

    // Cross-app URLs (from CrossAppUrls)
    readonly NEXT_PUBLIC_BLOG_URL: string
    readonly NEXT_PUBLIC_INSIGHTS_URL: string
    readonly NEXT_PUBLIC_CV_URL: string

    // Base variables
    readonly NEXT_PUBLIC_BASE_URL: string

    // Auth0 (from Auth0Variables)
    readonly NEXT_PUBLIC_AUTH0_DOMAIN: string
    readonly NEXT_PUBLIC_AUTH0_CLIENT_ID: string

    // Blog-specific
    readonly NEXT_PUBLIC_GITHUB_REPO_URL: string
  }
}
