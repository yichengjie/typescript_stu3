declare module 'classnames';
declare module 'react-hot-loader' ;
declare module 'lodash' ;

declare var require: any ;
declare let module : any ;
//ajax框架
declare var axios: any ;


declare var process: {
  env: {
    NODE_ENV: string
  }
};

declare module "*.json" {
  const value: any;
  export const version: string;
  export default value;
}


declare module "prop-types"