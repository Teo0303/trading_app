import React from "react";
import { UsersList } from "../../../components/Users";
import { Container } from "../../../styles/generalStyles";
import DefaultLayout from "../../layouts/default";
import { withFirebase } from "../../../services/fb";
import { withAuthorization } from "../Session";

const Users = withFirebase(UsersList);

export const Home: React.FC = () => {
  return (
    <div>
      <DefaultLayout>
        <Container>
          <Users></Users>
        </Container>
      </DefaultLayout>
    </div>
  );
};

const condition = (authUser: any) => !!authUser;

export default withAuthorization(condition)(Home);
