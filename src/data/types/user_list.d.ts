declare module '../user_list_data.json' {
    interface UserListData {
        id: number;
        name: string;
        image_file: string;
        family_id: number | null;
        talk_id: number | null;
    }
  
    const data: UserListData;
  
    export default data;
  }