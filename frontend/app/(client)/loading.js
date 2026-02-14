import MagicLoader from "../components/lightswind/MagicLoader";

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <MagicLoader size={180} particleCount={2} speed={1.2} />
        </div>
    );
}
