// overriding  the APP component to control the page initialization
import App, { Container} from "next/app";
import Page from "../components/Page"
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";


class MyApp extends App {
    // getInitialProps is a special next.js life cycle method which will run first before the first render actually happens. By returning anything here you expose it via props which inturn allows us to use it via props in the render
    static async getInitialProps({ Component, ctx }){
        let pageProps = {};
        // what this does in here is that every single page that we have its going to crawl the entire page for any queries or mutations that we have inside of that page that need to be fetched.
        if(Component.getInitialProps){
            pageProps = await Component.getInitialProps(ctx);
        }
        // this exposes the query to the user 
        pageProps.query = ctx.query;
        return { pageProps };
    }
    render() {
        const {
            Component, apollo, pageProps
        } = this.props;
        return ( 
          <Container >
            <ApolloProvider client={apollo}>
              {/* Persisting layout between page changes
            Keeping state when navigating pages */}
              <Page>
                <Component { ...pageProps } />
              </Page>
            </ApolloProvider>
         </Container>
        );
    }
}
//  due to this being a higher order component (withData) by wrapping MyApp this allows us to access our apollo client via this.props
export default withData (MyApp);