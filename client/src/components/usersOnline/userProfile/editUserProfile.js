function EditUserProfile(props) {
  return (
    <div>
      <input value={props.username} />
      <input value={props.email} />
    </div>
  )
}

export default EditUserProfile;