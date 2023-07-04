export default function useURLParam (srchParam, srchParamVal) {
    const browserURL = new URL(window.location.href);
    const petName = browserURL.searchParams.get(srchParam);
    if ( petName && (petName === srchParamVal))  return true;  
    
    return false;
}