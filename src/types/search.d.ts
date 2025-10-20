export interface SearchResult {
  id: string
  username: string
  display_name: string
  dotvatar_url?: string
  bio?: string
  verified?: boolean

  // if you’re using this for posts or mixed results
  type?: 'user' | 'post'
  title?: string
}
