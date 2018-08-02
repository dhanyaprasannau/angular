import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class QueryService{
    constructor(private httpClient:HttpClient){
    }

    getQueryDetails(queryName:string, rowValues:string, columnValues:string, whereFilter:string){
        const mdxQuery='SELECT\
        NON EMPTY {'+columnValues+'} ON COLUMNS,\
        NON EMPTY {'+rowValues+'} ON ROWS';
        const cube = this.getCube();
        const executeMdx = this.buildThinQuery(cube,queryName+Math.random(),mdxQuery,whereFilter,true);
        return this.httpClient.post('/rest/saiku/api/query/execute', executeMdx); 
    }

    getItemListQuery(queryVal:string, queryName:string, whereFilter:string){
        const mdxQuery='SELECT {} ON 0, DISTINCT('+queryVal+') ON 1';
        const cube = this.getCube();
        const executeMdx = this.buildThinQuery(cube,queryName+Math.random(),mdxQuery,whereFilter,true);
        return this.httpClient.post('/rest/saiku/api/query/execute', executeMdx); 
    }

    getWithMemberQuery(queryName:string, whereFilter:string){
        const mdxQuery = "WITH \
        MEMBER [Measures].[PercentageOfAll] AS\
            [Measures].[Quote Count]\
            /\
           ([postcode].[postcode].[All postcode],[Measures].[Quote Count])\
        ,FORMAT_STRING = 'Percent'\
        SELECT \
         {[Measures].[PercentageOfAll]} ON 0,\
          [postcode].[postcode].[postcode].Members ON 1";
        const cube = this.getCube();
        const executeMdx = this.buildThinQuery(cube,queryName+Math.random(),mdxQuery,whereFilter,true);
        return this.httpClient.post('/rest/saiku/api/query/execute', executeMdx); 
    }

    getCube(){
        const cube = {
        uniqueName:'[MIS].[mydb].[mydb].[Policies]', 
        name:'Policies', 
        caption:'', 
        catalog:"mydb", 
        connection:'MIS',schema:'mydb',visible:false};
        return cube;
      
    }
    buildThinQuery(cube,queryName, query, filterClause, showParents){
        return {
            "queryModel": {
                axes:{},
                calculatedMeasures:[],
                calculatedMembers:[],
                details:null,
                lowestLevelsOnly: false,
                visualTotals: false,
                visualTotalsPattern: null
            },
            "cube": cube,
            "mdx": query + ' FROM ['+cube.name+'] '+filterClause,
            "name": queryName,
            "parameters": {},
            "plugins": {},
            "properties": this.includeParents(showParents),
            "metadata": {},
            "queryType": "OLAP",
            "type": "MDX"
        };
    }

    includeParents(showParents) {
        if (showParents) {
            return {
                "saiku.olap.result.formatter": "flat",
                "saiku.web.export.csv.name": "abc"
            };
        }
        else {
            return { "saiku.web.export.csv.name": "abc"};
        }
    }
}