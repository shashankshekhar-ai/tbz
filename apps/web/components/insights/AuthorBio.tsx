import Link from "next/link";
import Image from "next/image";
import type { InsightAuthor } from "./types";

export function AuthorBio({ author }: { author: InsightAuthor }) {
  return (
    <div className="flex flex-col sm:flex-row gap-5 border border-[#D9E3E6] rounded-2xl p-6 bg-[#F7F8F9]">
      {author.image?.url ? (
        <Image
          src={author.image.url}
          alt={author.image.alt || author.name}
          width={72}
          height={72}
          className="w-18 h-18 rounded-full object-cover shrink-0"
        />
      ) : (
        <div
          aria-hidden="true"
          className="w-18 h-18 rounded-full shrink-0 bg-[#0c2940] text-white flex items-center justify-center font-montserrat font-bold text-xl"
        >
          {author.name.charAt(0)}
        </div>
      )}

      <div>
        <p className="font-montserrat font-bold text-[#0c2940]">{author.name}</p>
        {author.role && <p className="text-sm font-roboto text-[#39918d] mb-2">{author.role}</p>}
        {author.bio && <p className="text-sm font-roboto text-[#60707A] leading-relaxed mb-2">{author.bio}</p>}
        {author.profileUrl && (
          <Link
            href={author.profileUrl}
            className="text-sm font-inter font-semibold text-[#0c2940] hover:text-[#39918d] transition-colors"
          >
            More from {author.name.split(" ")[0]} →
          </Link>
        )}
      </div>
    </div>
  );
}
