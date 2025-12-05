const Total = ({parts}) => {
  console.log(parts)
  const total = parts.reduce((sum, p) => sum + p.exercises , 0)
  return(
    <>Number of exercises {total}</>
  )
}
export default Total