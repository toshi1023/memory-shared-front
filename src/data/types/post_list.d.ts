declare module '../post_list_data.json' {
    interface PostListData {
      id: number;
      content: string;
      user_id: number;
      updated_at: string;
    }
  
    const data: PostListData;
  
    export default data;
  }