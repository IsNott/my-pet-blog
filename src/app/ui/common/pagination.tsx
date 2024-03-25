// 'use client'
import { Flex,Button,Text,Strong } from "@radix-ui/themes";
// import { useRouter } from "next/navigation";
export default function Pagination({ pageSize, totalPage, path }: { pageSize: number, totalPage: number, path: any }) {
        return(
        <Flex gap="3" align="center" justify="end">
            {getPageBtn(pageSize,totalPage,path)}
            <Text>TOTAL: <Strong>{totalPage}</Strong></Text>
        </Flex>
    )
};


function getPageBtn(size:number,totalPage:number,path:string){
    const numberArray = Array.from({ length: Math.min(size, totalPage) }, (v, i) => i + 1);
    
    return(
        numberArray.map((i)=>{
           return <Button onClick={handlePageButtonClick(i,path)!} key={i}>{i}</Button>
        })
        
    )

}

function handlePageButtonClick(pageNumber:number,pathName:string) {
    // 使用 Next.js 的路由机制将值传递到另一个页面或组件
    // useRouter().push(`/${pathName}/${pageNumber}`)
}