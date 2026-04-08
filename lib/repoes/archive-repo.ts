import { Archive } from "@/types/archive";
import { prisma } from "../prisma";
import { ArchiveOutlined } from "@mui/icons-material";

export async function createArchive(title: string): Promise<Archive> {

	let result = await prisma.archive.create({

		data: {

			title: title,
			archiveData: new Date()

		}
	});

	let archive: Archive = {
		id: result.id,
		title: result.title,
		archiveData: result.archiveData
	}

	return archive;
}

