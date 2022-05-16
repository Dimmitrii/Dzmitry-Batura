export default function getTax(total){
    return Number((total * 0.21).toFixed(2));
}