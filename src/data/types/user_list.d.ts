declare module '../user_list_data.json' {
    interface UserListData {
      id: number;
      name: string;
      image_file: string;
    }
  
    const data: UserListData;
  
    export default data;
  }