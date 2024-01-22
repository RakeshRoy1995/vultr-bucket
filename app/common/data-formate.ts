
export const dataFormate = (dataFormate :any , dbData:any , isArray=true) => {
    let data:any = []

    if (isArray) {
        dbData.map((d :any)=>{
            let tmpData:any = {}
            dataFormate.map((data_f :any)=>{
                if ( d[data_f.db]  ) {
                    tmpData[data_f.mine] = d[data_f.db]
                }
            })
            data.push(tmpData)
        })
        return data
    }else{
        let tmpData:any = {}
        for (const property in dbData) {
            dataFormate.map((data_f:any )=>{
                if ( data_f.db ==  property ) {
                    tmpData[data_f.mine] = dbData[property]
                }
            })
        }

        return tmpData
    }

    
};

export const ProductTableFormateObj = [
    {
        db : "_id",
        mine: "product_id"
    },
    {
        db : "name",
        mine: "product_name"
    },
    {
        db : "description",
        mine: "product_description"
    },
    {
        db : "price",
        mine: "product_price"
    },
    {
        db : "status",
        mine: "product_status"
    },
    {
        db : "image",
        mine: "product_image"
    },
    {
        db : "createdAt",
        mine: "product_created"
    },
    {
        db : "updatedAt",
        mine: "product_updated"
    },
]

export const UserTableFormateObj = [
    {
        db : "_id",
        mine: "user_id"
    },
    {
        db : "email",
        mine: "user_email"
    },
    {
        db : "verification_token",
        mine: "user_verification_token"
    },

    {
        db : "access_token",
        mine: "user_access_token"
    }
]


export const mkzID = (len: number = 5): string => {
    const id = Date.now()
        .toString()
        .slice(12 - len, -1);

    return id.toString();
};
