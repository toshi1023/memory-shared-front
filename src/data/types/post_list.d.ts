declare module '../post_list_data.json' {
    interface PostListData {
      id: number;
      content: string;
      user_id: number;
      user_name: string;
      updated_at: string;
      comment: {
        id: number;
        content: string;
        user_id: number;
        user_name: string;
        updated_at: string;
      }[]
    }
  
    const data: PostListData;
  
    export default data;
  }