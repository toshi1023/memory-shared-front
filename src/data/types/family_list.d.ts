declare module '../family_list_data.json' {
    interface FamilyListData {
      id: number;
      name: string;
      image_file: string;
      hobby: string;
      gender: boolean;
      description: string | null;
    }
  
    const data: FamilyListData;
  
    export default data;
  }