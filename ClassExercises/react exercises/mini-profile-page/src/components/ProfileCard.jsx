import Button from "./Button";

export default function ProfileCard({ avatar, name, description, type }) {
  return (
    <div className="profile-card">
      <img src={avatar} alt={name} className="avatar" />
      <h2 className="card-name">{name}</h2>
      <p className="card-description">{description}</p>
      <Button type={type} />
    </div>
  );
}