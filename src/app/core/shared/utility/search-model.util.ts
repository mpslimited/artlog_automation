export class SearchModelUtil {

      assignValueFromApi(searchModel: any, apiDataModel) {
            const keys = Object.keys(searchModel);
            let apiValue = null;
            keys.forEach((key) => {
                  if (typeof searchModel[key] === 'object') {
                        apiValue = apiDataModel[searchModel[key].fillFromKey];

                        if (apiValue === null || apiValue === undefined) {
                              searchModel[key].value = '';
                        } else {
                              searchModel[key].value = apiValue;
                        }
                  }
            });
      }


      emptySearchModel(searchModel: any, emptyWith: null | '' = '') {
            const keys = Object.keys(searchModel);
            keys.forEach((key) => {
                  if (typeof searchModel[key] === 'object') {
                        searchModel[key].value = emptyWith;
                  }
            });

      }

}

