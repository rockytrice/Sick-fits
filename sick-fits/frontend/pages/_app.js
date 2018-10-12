// overriding  the APP component to control the page initialization
import App, { Container} from "next/app";
import Page from "../components/Page"

class MyApp extends App {
    render() {
        const {
            Component
        } = this.props;
        return ( 
          <Container >
            {/* Persisting layout between page changes
            Keeping state when navigating pages */}
            <Page>
              <Component />
            </Page>
         </Container>
        );
    }
}
export default MyApp;