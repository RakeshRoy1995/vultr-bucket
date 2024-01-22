
export const makeURL = (string:string)=>{
    return string.replace(/[^a-zA-Z0-9 ঀ ঁ ং ঃ অ আ ই ঈ উ ঊ ঋ ঌ এ ঐ ও ঔ ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ ত থ দ ধ ন প ফ ব ভ ম য র ল শ ষ স হ ় ঽ া ি ী ু ূ ৃ ৄ ে ৈ ো ৌ ্ ৎ ৗ ড় ঢ় য় ৠ ৡ ৢ ৣ ০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯ ৰ ৱ ৲ ৳ ৴ ৵ ৶ ৷ ৸ ৹ ৺ ৻ ৼ ৽ ৾]/g, "").replace(/\s+/g, '-').toLowerCase();
}


export const formatError = (msg: string) => ({
    success:false , msg
});

export const formatSuccess = (data: any) => ({
    success:true , data
});
