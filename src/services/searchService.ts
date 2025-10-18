// ==================== src/services/searchService.ts ====================
export const searchService = {
  async searchAll(query: string, limit = 20) {
    try {
      const { data: users } = await supabase
        .from('users')
        .select('*')
        .ilike('username', `%${query}%`)
        .limit(limit);

      const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .ilike('content', `%${query}%`)
        .limit(limit);

      return {
        users: users || [],
        posts: posts || [],
      };
    } catch (error) {
      console.error('Search failed:', error);
      throw error;
    }
  },

  async getTrendingTags(limit = 10) {
    try {
      // TODO: Implement trending tags from posts
      return [];
    } catch (error) {
      console.error('Failed to fetch trending tags:', error);
      throw error;
    }
  },
};