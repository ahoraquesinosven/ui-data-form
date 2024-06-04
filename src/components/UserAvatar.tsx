export function UserAvatar({user, showName}) {
  return (
    <>
    <img 
      src={user.pictureUrl}
      style={{
        width: "2em",
        height: "2em",
        borderRadius: "50%",
      }}
    />
      { showName && (
        <span className="ms-2">{user.name}</span>
      )}
    </>
  )
}
