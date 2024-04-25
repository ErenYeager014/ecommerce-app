interface HeadingProps {
    title: string;
    description: string;
}
const Headings: React.FC<HeadingProps> = ({ title, description }) => {
    return (<div >
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-mute">{description}</p>
    </div>);
}

export default Headings;