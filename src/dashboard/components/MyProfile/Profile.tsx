import { MyProfile } from ".";

export const Profile = ({...props}) => {
    const {data, loading} = MyProfile()
    if(loading) {
        return <h4>Loading...</h4>
    }
    console.log(data);
    
    
  return <h3>In Profile Page</h3>;
};
