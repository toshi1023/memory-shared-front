declare module '../user_list_data.json' {
    interface UserListData {
      id: number;
      name: string;
      image_file: string;
      hobby: string;
      gender: boolean;
      description: string | null;
    }
  
    const data: UserListData;
  
    export default data;
  }