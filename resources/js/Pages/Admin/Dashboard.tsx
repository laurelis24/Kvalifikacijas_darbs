import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import AdminPanel from "./AdminPanel";

interface PostsLastWeek {
    date: string;
    count: number;
}

interface PostsByCategory {
    title: string;
    color: string;
    count: number;
}
export default function Dashboard({
    usersOnline,
    postsCreatedLastWeek,
    postsByCategory,
}: {
    usersOnline: number;
    postsCreatedLastWeek: PostsLastWeek[];
    postsByCategory: PostsByCategory[];
}) {
    console.log(postsByCategory);

    return (
        <AdminPanel>
            <div className="flex h-full flex-col gap-20">
                <div>
                    <h2>Users online:</h2>
                    <UsersOnline usersOnline={usersOnline} />
                </div>

                <div>
                    <h2>Posts created last week:</h2>
                    <PostsCreatedLastWeek postsCreatedLastWeek={postsCreatedLastWeek} />
                </div>
                <div>
                    <h2>Posts by category:</h2>
                    <PostsByCategory postsByCategory={postsByCategory} />
                </div>
            </div>
        </AdminPanel>
    );
}

const UsersOnline = ({ usersOnline }: { usersOnline: number }) => {
    return (
        <div className="flex items-center justify-center rounded-lg bg-blue-500 p-4 text-white shadow-md">
            <span className="mr-2 text-2xl font-semibold">👥</span>
            <p className="text-xl">{usersOnline} users online</p>
        </div>
    );
};

const PostsCreatedLastWeek = ({ postsCreatedLastWeek }: { postsCreatedLastWeek: PostsLastWeek[] }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={postsCreatedLastWeek}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="post_count" name="Posts" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

const PostsByCategory = ({ postsByCategory }: { postsByCategory: PostsByCategory[] }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={postsByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis allowDecimals={false} />
                <Tooltip />

                <Bar dataKey="count" isAnimationActive={true} label={{ position: "top" }}>
                    {postsByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};
